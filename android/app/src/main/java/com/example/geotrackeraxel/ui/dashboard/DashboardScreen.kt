package com.example.geotrackeraxel.ui.dashboard

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.geotrackeraxel.ui.theme.*

@Composable
fun DashboardScreen(onCapture: () -> Unit, onList: () -> Unit, onMap: () -> Unit, onLogout: () -> Unit) {
    GeoBackdrop {
        Column(
            Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(22.dp),
            verticalArrangement = Arrangement.spacedBy(15.dp)
        ) {
            Spacer(Modifier.height(10.dp))
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically) {
                Column {
                    Text("GEOTRACKER", style = MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.Bold, color = BrandBlue)
                    Text("Hola, explorador 👋", style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold, color = Navy)
                }
                Surface(shape = RoundedCornerShape(16.dp), color = Color.White) {
                    Text("⌖", Modifier.padding(horizontal = 17.dp, vertical = 10.dp),
                        style = MaterialTheme.typography.headlineMedium, color = BrandBlue)
                }
            }
            Spacer(Modifier.height(4.dp))
            Surface(
                shape = RoundedCornerShape(26.dp),
                color = Navy, modifier = Modifier.fillMaxWidth()
            ) {
                Box(Modifier.background(Brush.horizontalGradient(listOf(Navy, DeepBlue)))) {
                    Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text("TU PRÓXIMA AVENTURA", style = MaterialTheme.typography.labelMedium,
                            color = Color(0xFFB3D4FF))
                        Text("Guarda los lugares que importan.", style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold, color = Color.White)
                        Text("Captura tu ubicación GPS y vuelve a encontrarla cuando quieras.",
                            style = MaterialTheme.typography.bodyMedium, color = Color(0xFFD9E7FF))
                        Button(onClick = onCapture, shape = RoundedCornerShape(16.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Teal)) {
                            Text("＋  Registrar lugar", fontWeight = FontWeight.SemiBold, color = Navy)
                        }
                    }
                }
            }
            Spacer(Modifier.height(4.dp))
            Text("Tu espacio", style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold, color = Navy)
            DashboardTile("📍", "Capturar ubicación", "Guardar un lugar usando tu GPS", onCapture)
            DashboardTile("▤", "Mis ubicaciones", "Todos tus registros guardados", onList)
            DashboardTile("🗺", "Mapa interactivo", "Explora los lugares en Google Maps", onMap)
            Spacer(Modifier.height(8.dp))
            OutlinedButton(onClick = onLogout, modifier = Modifier.fillMaxWidth().height(50.dp),
                shape = RoundedCornerShape(16.dp)) { Text("Cerrar sesión") }
            Spacer(Modifier.height(10.dp))
        }
    }
}

@Composable
private fun DashboardTile(symbol: String, title: String, subtitle: String, onClick: () -> Unit) {
    Card(
        onClick = onClick, modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(15.dp)) {
            Box(Modifier.size(56.dp).background(IceBlue, RoundedCornerShape(17.dp)),
                contentAlignment = Alignment.Center) {
                Text(symbol, style = MaterialTheme.typography.headlineMedium, color = BrandBlue)
            }
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(title, style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold, color = Navy)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = Slate)
            }
            Text("›", style = MaterialTheme.typography.headlineMedium, color = BrandBlue)
        }
    }
}
