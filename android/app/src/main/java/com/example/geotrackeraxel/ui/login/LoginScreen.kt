package com.example.geotrackeraxel.ui.login

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import com.example.geotrackeraxel.ui.theme.*

@Composable
fun LoginScreen(vm: LoginViewModel, onSuccess: () -> Unit) {
    val state by vm.state.collectAsState()
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    LaunchedEffect(state.success) { if (state.success) onSuccess() }

    GeoBackdrop {
        Column(
            modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(26.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Spacer(Modifier.height(38.dp))
            Box(
                Modifier.size(86.dp).background(
                    Brush.linearGradient(listOf(BrandBlue, DeepBlue)), RoundedCornerShape(27.dp)
                ), contentAlignment = Alignment.Center
            ) {
                Text("⌖", style = MaterialTheme.typography.displayLarge, color = Color.White)
            }
            Spacer(Modifier.height(22.dp))
            Text("GeoTracker", style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.ExtraBold, color = Navy)
            Spacer(Modifier.height(8.dp))
            Text("Tus lugares, siempre contigo", style = MaterialTheme.typography.bodyLarge, color = Slate)
            Spacer(Modifier.height(32.dp))

            Surface(
                shape = RoundedCornerShape(28.dp), color = Color.White, shadowElevation = 8.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Text("Bienvenido", style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold, color = Navy)
                    Text("Inicia sesión para continuar", color = Slate)
                    OutlinedTextField(
                        value = email, onValueChange = { email = it },
                        label = { Text("Correo electrónico") },
                        placeholder = { Text("correo@ejemplo.com") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                        singleLine = true, shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = password, onValueChange = { password = it },
                        label = { Text("Contraseña") },
                        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                        trailingIcon = {
                            TextButton(onClick = { passwordVisible = !passwordVisible }) {
                                Text(if (passwordVisible) "Ocultar" else "Ver")
                            }
                        },
                        singleLine = true, shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth()
                    )
                    state.error?.let {
                        Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
                    }
                    GeoPrimaryButton(
                        if (state.loading) "Conectando..." else "Iniciar sesión",
                        onClick = { vm.login(email, password) }, enabled = !state.loading,
                        modifier = Modifier.fillMaxWidth()
                    )
                    if (state.loading) LinearProgressIndicator(Modifier.fillMaxWidth())
                }
            }
            Spacer(Modifier.height(30.dp))
            Text("GeoTracker · Universidad Da Vinci", style = MaterialTheme.typography.labelSmall, color = Slate)
            Spacer(Modifier.height(24.dp))
        }
    }
}
