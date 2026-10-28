package com.example.geotrackeraxel

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.google.android.gms.location.LocationServices
import com.example.geotrackeraxel.data.remote.ApiClient
import com.example.geotrackeraxel.data.remote.SessionStore
import com.example.geotrackeraxel.data.repository.GeoRepository
import com.example.geotrackeraxel.ui.login.*
import com.example.geotrackeraxel.ui.dashboard.*
import com.example.geotrackeraxel.ui.captura.*
import com.example.geotrackeraxel.ui.listado.*
import com.example.geotrackeraxel.ui.mapa.*
import com.example.geotrackeraxel.ui.theme.GeoTrackerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { GeoTrackerTheme { GeoTrackerNavigation() } }
    }
}

private class SimpleFactory<T : ViewModel>(private val make: () -> T) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <M : ViewModel> create(modelClass: Class<M>): M = make() as M
}

@Composable
private fun GeoTrackerNavigation() {
    val context = LocalContext.current.applicationContext
    val session = remember { SessionStore(context) }
    val repository = remember { GeoRepository(ApiClient.create(context)) }
    val gps = remember { LocationServices.getFusedLocationProviderClient(context) }
    val nav = rememberNavController()
    val start = remember { if (session.token().isBlank()) "login" else "dashboard" }
    NavHost(navController = nav, startDestination = start) {
        composable("login") {
            val vm: LoginViewModel = viewModel(factory = SimpleFactory { LoginViewModel(repository, session) })
            LoginScreen(vm) {
                nav.navigate("dashboard") { popUpTo("login") { inclusive = true } }
            }
        }
        composable("dashboard") {
            DashboardScreen(
                onCapture = { nav.navigate("captura") },
                onList = { nav.navigate("listado") },
                onMap = { nav.navigate("mapa") },
                onLogout = {
                    session.clear()
                    nav.navigate("login") { popUpTo("dashboard") { inclusive = true } }
                }
            )
        }
        composable("captura") {
            val vm: CaptureViewModel = viewModel(factory = SimpleFactory { CaptureViewModel(repository, gps) })
            CaptureScreen(vm) { nav.popBackStack() }
        }
        composable("listado") {
            val vm: LocationsViewModel = viewModel(factory = SimpleFactory { LocationsViewModel(repository) })
            LocationsScreen(vm, onBack = { nav.popBackStack() }, onMap = { nav.navigate("mapa") })
        }
        composable("mapa") {
            val vm: MapViewModel = viewModel(factory = SimpleFactory { MapViewModel(repository) })
            MapScreen(vm) { nav.popBackStack() }
        }
    }
}
