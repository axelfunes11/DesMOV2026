package com.example.geotrackeraxel.ui.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.geotrackeraxel.data.remote.SessionStore
import com.example.geotrackeraxel.data.repository.GeoRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class LoginState(val loading: Boolean = false, val error: String? = null, val success: Boolean = false)

class LoginViewModel(private val repo: GeoRepository, private val session: SessionStore): ViewModel() {
    private val _state = MutableStateFlow(LoginState())
    val state: StateFlow<LoginState> = _state.asStateFlow()

    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            _state.value = LoginState(error = "Escribe tu correo y contrasena")
            return
        }
        viewModelScope.launch {
            _state.value = LoginState(loading = true)
            try {
                session.save(repo.login(email, password))
                _state.value = LoginState(success = true)
            } catch (e: Exception) {
                _state.value = LoginState(error = e.message ?: "No se pudo conectar al servidor")
            }
        }
    }
}
