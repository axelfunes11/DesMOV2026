package com.example.geotrackeraxel.ui.mapa

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.geotrackeraxel.data.model.GeoLocation
import com.example.geotrackeraxel.data.repository.GeoRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class MapState(
    val loading: Boolean = false,
    val items: List<GeoLocation> = emptyList(),
    val selected: GeoLocation? = null,
    val error: String? = null
)

class MapViewModel(private val repo: GeoRepository): ViewModel() {
    private val _state = MutableStateFlow(MapState())
    val state: StateFlow<MapState> = _state.asStateFlow()
    fun refresh() {
        viewModelScope.launch {
            _state.value = MapState(loading = true)
            try { _state.value = MapState(items = repo.locations()) }
            catch(e: Exception) { _state.value = MapState(error = e.message ?: "Error de conexion") }
        }
    }
    fun select(place: GeoLocation) { _state.update { it.copy(selected = place) } }
    fun dismissDialog() { _state.update { it.copy(selected = null) } }
}
