package com.example.geotrackeraxel.ui.captura

import android.annotation.SuppressLint
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import com.example.geotrackeraxel.data.repository.GeoRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class CaptureState(val loading: Boolean = false, val message: String? = null, val success: Boolean = false)

class CaptureViewModel(private val repo: GeoRepository, private val gps: FusedLocationProviderClient): ViewModel() {
    private val _state = MutableStateFlow(CaptureState())
    val state: StateFlow<CaptureState> = _state.asStateFlow()

    fun showError(message: String) { _state.value = CaptureState(message = message) }

    // Invocar exclusivamente despues de comprobar permisos en CaptureScreen.
    @SuppressLint("MissingPermission")
    fun captureAndSave(name: String, description: String) {
        if (name.isBlank() || description.isBlank()) {
            showError("Escribe el nombre y la descripcion")
            return
        }
        _state.value = CaptureState(loading = true, message = "Obteniendo GPS...")
        val cancellation = CancellationTokenSource()
        gps.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, cancellation.token)
            .addOnSuccessListener { location ->
                if (location == null) {
                    showError("No se encontro GPS. Activa la ubicacion y prueba al aire libre")
                    return@addOnSuccessListener
                }
                viewModelScope.launch {
                    _state.value = CaptureState(loading = true, message = "Guardando...")
                    try {
                        repo.save(name.trim(), description.trim(), location.latitude, location.longitude)
                        _state.value = CaptureState(message = "Ubicacion guardada correctamente", success = true)
                    } catch (e: Exception) {
                        showError(e.message ?: "Error al guardar")
                    }
                }
            }
            .addOnFailureListener { showError("GPS: ${it.localizedMessage ?: "error de ubicacion"}") }
    }
}
