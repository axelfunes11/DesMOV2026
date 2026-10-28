package com.example.geotrackeraxel.data.model

data class ApiResponse<T>(val standardResponse: ApiStatus? = null, val body: T? = null)
data class ApiStatus(val httpCode: Int = 0, val message: String = "")
data class LoginRequest(val email: String, val password: String)
data class LoginBody(val login: Boolean = false, val token: String? = null)
data class LocationRequest(
    val nombre: String, val descripcion: String, val latitud: Double, val longitud: Double
)
data class GeoLocation(
    val id: Long,
    val nombre: String,
    val descripcion: String,
    val latitud: Double,
    val longitud: Double,
    val createdAt: String? = null
)
data class LocationListBody(val ubicaciones: List<GeoLocation> = emptyList())
data class LocationCreateBody(val ubicacion: GeoLocation? = null)
