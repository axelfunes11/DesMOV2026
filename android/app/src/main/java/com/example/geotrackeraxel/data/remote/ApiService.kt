package com.example.geotrackeraxel.data.remote

import com.example.geotrackeraxel.data.model.*
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {
    @POST("api/v1/auth/login")
    suspend fun login(@Body body: LoginRequest): Response<ApiResponse<LoginBody>>

    @POST("api/v1/ubicaciones")
    suspend fun save(@Body body: LocationRequest): Response<ApiResponse<LocationCreateBody>>

    @GET("api/v1/ubicaciones")
    suspend fun mine(): Response<ApiResponse<LocationListBody>>
}
