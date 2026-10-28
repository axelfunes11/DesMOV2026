package com.example.geotrackeraxel.ui.listado

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.geotrackeraxel.data.model.GeoLocation
import com.example.geotrackeraxel.data.repository.GeoRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class LocationsState(val loading: Boolean = false, val items: List<GeoLocation> = emptyList(), val error: String? = null)

class LocationsViewModel(private val repo: GeoRepository): ViewModel() {
    private val _state = MutableStateFlow(LocationsState())
    val state: StateFlow<LocationsState> = _state.asStateFlow()
    fun refresh() {
        viewModelScope.launch {
            _state.value = LocationsState(loading = true)
            try { _state.value = LocationsState(items = repo.locations()) }
            catch(e: Exception) { _state.value = LocationsState(error = e.message ?: "Error de conexion") }
        }
    }
}
