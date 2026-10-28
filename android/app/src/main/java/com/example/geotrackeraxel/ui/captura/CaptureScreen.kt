package com.example.geotrackeraxel.ui.captura

import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.example.geotrackeraxel.ui.theme.*

@Composable
fun CaptureScreen(vm: CaptureViewModel, onBack: () -> Unit) {
    val state by vm.state.collectAsState()
    val context = LocalContext.current
    var name by remember { mutableStateOf("") }
    var description by remember { mutableStateOf("") }
    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { grants ->
        if (grants.values.any { it }) vm.captureAndSave(name, description)
        else vm.showError("Debes permitir acceso a la ubicación para capturar GPS")
    }
    GeoBackdrop {
        Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(22.dp),
            verticalArrangement = Arrangement.spacedBy(18.dp)) {
            GeoTitle("Nuevo lugar", "Guarda un punto de interés usando el GPS de tu dispositivo.", onBack)
            GeoInfoCard("📍  Ubicación actual", "El GPS capturará tus coordenadas al guardar. Activa la ubicación del teléfono.")
            Surface(shape = RoundedCornerShape(24.dp), color = androidx.compose.ui.graphics.Color.White,
                shadowElevation = 3.dp) {
                Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Text("Detalles del lugar", style = MaterialTheme.typography.titleLarge)
                    OutlinedTextField(value = name, onValueChange = { name = it },
                        label = { Text("Nombre del lugar") }, placeholder = { Text("Ej. Mi universidad") },
                        singleLine = true, shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth())
                    OutlinedTextField(value = description, onValueChange = { description = it },
                        label = { Text("Descripción") }, placeholder = { Text("¿Qué hace especial este lugar?") },
                        minLines = 3, maxLines = 5, shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.fillMaxWidth())
                    GeoPrimaryButton("⌖  Capturar GPS y guardar", onClick = {
                        val fine = ContextCompat.checkSelfPermission(context,
                            Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        val coarse = ContextCompat.checkSelfPermission(context,
                            Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        if (fine || coarse) vm.captureAndSave(name, description)
                        else permissionLauncher.launch(arrayOf(Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION))
                    }, enabled = !state.loading, modifier = Modifier.fillMaxWidth())
                    if (state.loading) LinearProgressIndicator(Modifier.fillMaxWidth())
                    state.message?.let { message ->
                        Text(message, color = if (state.success) Teal else if (state.loading) Slate else MaterialTheme.colorScheme.error)
                    }
                }
            }
        }
    }
}
