package com.example.geotrackeraxel.ui.mapa

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.geotrackeraxel.ui.theme.*
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import com.google.maps.android.compose.GoogleMap
import com.google.maps.android.compose.Marker
import com.google.maps.android.compose.MarkerState
import com.google.maps.android.compose.rememberCameraPositionState

@Composable
fun MapScreen(vm: MapViewModel, onBack: () -> Unit) {
    val state by vm.state.collectAsState()
    val cameraState = rememberCameraPositionState()
    var mapLoaded by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { vm.refresh() }

    LaunchedEffect(mapLoaded, state.items) {
        if (mapLoaded && state.items.isNotEmpty()) {
            if (state.items.size == 1) {
                val p = state.items.first()
                cameraState.animate(CameraUpdateFactory.newLatLngZoom(LatLng(p.latitud, p.longitud), 15f))
            } else {
                val bounds = LatLngBounds.builder().apply {
                    state.items.forEach { include(LatLng(it.latitud, it.longitud)) }
                }.build()
                cameraState.animate(CameraUpdateFactory.newLatLngBounds(bounds, 100))
            }
        }
    }

    Column(Modifier.fillMaxSize()) {
        Surface(shadowElevation = 3.dp, color = Color.White) {
            Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                TextButton(onClick = onBack, contentPadding = PaddingValues(0.dp)) {
                    Text("‹  Volver", color = BrandBlue)
                }
                Text("Mapa de lugares", style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold, color = Navy)
                Text("Toca un marcador para ver los detalles", color = Slate)
                if (state.loading) LinearProgressIndicator(Modifier.fillMaxWidth())
                state.error?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            }
        }
        Box(Modifier.fillMaxWidth().weight(1f)) {
            GoogleMap(
                modifier = Modifier.fillMaxSize(),
                cameraPositionState = cameraState,
                onMapLoaded = { mapLoaded = true }
            ) {
                state.items.forEach { place ->
                    Marker(
                        state = MarkerState(position = LatLng(place.latitud, place.longitud)),
                        title = place.nombre,
                        onClick = { vm.select(place); true } // true: no mostrar InfoWindow
                    )
                }
            }
            if (!state.loading && state.error == null && state.items.isEmpty()) {
                Surface(modifier = Modifier.align(Alignment.Center).padding(24.dp),
                    shape = RoundedCornerShape(18.dp), color = Color.White, shadowElevation = 5.dp) {
                    Text("Todavía no tienes ubicaciones guardadas",
                        Modifier.padding(20.dp), color = Slate)
                }
            }
            if (state.items.isNotEmpty()) {
                Surface(modifier = Modifier.align(Alignment.BottomCenter).padding(18.dp),
                    shape = RoundedCornerShape(18.dp), color = Navy, shadowElevation = 6.dp) {
                    Text("📍  ${state.items.size} lugar(es) en tu mapa",
                        Modifier.padding(horizontal = 22.dp, vertical = 14.dp), color = Color.White)
                }
            }
        }
    }
    state.selected?.let { place ->
        AlertDialog(
            onDismissRequest = vm::dismissDialog,
            shape = RoundedCornerShape(24.dp),
            title = { Text("📍 ${place.nombre}", fontWeight = FontWeight.Bold) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(place.descripcion)
                    HorizontalDivider()
                    Text("Latitud: ${place.latitud}")
                    Text("Longitud: ${place.longitud}")
                }
            },
            confirmButton = {
                TextButton(onClick = vm::dismissDialog) { Text("Cerrar", color = BrandBlue) }
            }
        )
    }
}
