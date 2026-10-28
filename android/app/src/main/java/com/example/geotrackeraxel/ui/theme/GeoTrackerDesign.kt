package com.example.geotrackeraxel.ui.theme

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

val Navy = Color(0xFF101F38)
val DeepBlue = Color(0xFF1B3670)
val BrandBlue = Color(0xFF3268EC)
val IceBlue = Color(0xFFE9F0FF)
val Teal = Color(0xFF12B9A9)
val Slate = Color(0xFF66758F)
val AppBackground = Color(0xFFF3F6FC)

private val palette = lightColorScheme(
    primary = BrandBlue,
    onPrimary = Color.White,
    primaryContainer = IceBlue,
    onPrimaryContainer = Navy,
    secondary = Teal,
    background = AppBackground,
    onBackground = Navy,
    surface = Color.White,
    onSurface = Navy,
    surfaceVariant = Color(0xFFF0F4FB),
    onSurfaceVariant = Slate,
    outline = Color(0xFFD8E1EF)
)

@Composable
fun GeoTrackerTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = palette, content = content)
}

@Composable
fun GeoBackdrop(content: @Composable BoxScope.() -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(Color(0xFFE9F1FF), AppBackground, Color.White))),
        content = content
    )
}

@Composable
fun GeoTitle(title: String, subtitle: String, onBack: (() -> Unit)? = null) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        if (onBack != null) {
            TextButton(onClick = onBack, contentPadding = PaddingValues(0.dp)) {
                Text("‹  Volver", color = BrandBlue)
            }
        }
        Text(title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold, color = Navy)
        Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = Slate)
    }
}

@Composable
fun GeoInfoCard(heading: String, detail: String, modifier: Modifier = Modifier) {
    Surface(modifier = modifier, shape = RoundedCornerShape(20.dp), color = Color.White,
        shadowElevation = 2.dp) {
        Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(heading, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text(detail, style = MaterialTheme.typography.bodyMedium, color = Slate)
        }
    }
}

@Composable
fun GeoPrimaryButton(label: String, onClick: () -> Unit, enabled: Boolean = true, modifier: Modifier = Modifier) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.height(54.dp),
        shape = RoundedCornerShape(17.dp),
        colors = ButtonDefaults.buttonColors(containerColor = BrandBlue)
    ) {
        Text(label, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
    }
}
