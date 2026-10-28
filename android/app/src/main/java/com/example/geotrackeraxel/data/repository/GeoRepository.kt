package com.example.geotrackeraxel.data.repository

import com.example.geotrackeraxel.data.model.*
import com.example.geotrackeraxel.data.remote.ApiService

class GeoRepository(private val api: ApiService) {
    suspend fun login(email: String, password: String): String {
        val response = api.login(LoginRequest(email.trim(), password))
        if (!response.isSuccessful) throw Exception(
            if (response.code() == 401) "Correo o contrasena incorrectos" else "Login: error HTTP ${response.code()}"
        )
        val token = response.body()?.body?.token
        if (token.isNullOrBlank()) throw Exception("El servidor no devolvio un token")
        return token
    }

    suspend fun save(nombre: String, descripcion: String, lat: Double, lng: Double) {
        val response = api.save(LocationRequest(nombre, descripcion, lat, lng))
        if (!response.isSuccessful) throw Exception("No se pudo guardar. HTTP ${response.code()}")
        if (response.body()?.body?.ubicacion == null) throw Exception("Respuesta incompleta del servidor")
    }

    suspend fun locations(): List<GeoLocation> {
        val response = api.mine()
        if (!response.isSuccessful) throw Exception("No se pudieron consultar ubicaciones. HTTP ${response.code()}")
        return response.body()?.body?.ubicaciones ?: throw Exception("Respuesta invalida del servidor")
    }
}
