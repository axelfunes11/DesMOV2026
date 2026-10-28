package com.example.geotrackeraxel.ui.listado

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.geotrackeraxel.ui.theme.*

@Composable
fun LocationsScreen(vm: LocationsViewModel, onBack: () -> Unit, onMap: () -> Unit) {
    val state by vm.state.collectAsState()
    LaunchedEffect(Unit) { vm.refresh() }
    GeoBackdrop {
        Column(Modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(15.dp)) {
            GeoTitle("Mis ubicaciones", "Consulta tus lugares guardados en GeoTracker.", onBack)
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                GeoPrimaryButton("🗺  Ver mapa", onClick = onMap, modifier = Modifier.weight(1f))
                OutlinedButton(onClick = vm::refresh, shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.height(54.dp)) { Text("Actualizar") }
            }
            if (state.loading) LinearProgressIndicator(Modifier.fillMaxWidth())
            state.error?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            if (!state.loading && state.error == null && state.items.isEmpty()) {
                GeoInfoCard("Aún no hay lugares", "Abre Capturar ubicación y guarda tu primer punto GPS.")
            }
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp),
                contentPadding = PaddingValues(bottom = 20.dp)) {
                items(state.items, key = { it.id }) { place ->
                    Card(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)) {
                        Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                                Text("📍")
                                Text(place.nombre, style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold, color = Navy)
                            }
                            Text(place.descripcion, style = MaterialTheme.typography.bodyMedium, color = Slate)
                            HorizontalDivider(color = IceBlue)
                            Text("${"%.5f".format(place.latitud)}, ${"%.5f".format(place.longitud)}",
                                style = MaterialTheme.typography.labelMedium, color = BrandBlue)
                        }
                    }
                }
            }
        }
    }
}
