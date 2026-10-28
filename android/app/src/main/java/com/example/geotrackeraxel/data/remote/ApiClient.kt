package com.example.geotrackeraxel.data.remote

import android.content.Context
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object ApiClient {
    private const val BASE_URL = "https://axelfunes.aplicacionesweb2026.com/"

    fun create(context: Context): ApiService {
        val session = SessionStore(context.applicationContext)
        val http = OkHttpClient.Builder()
            .addInterceptor { chain ->
                val original = chain.request()
                val token = session.token()
                val request = original.newBuilder().apply {
                    if (token.isNotBlank()) header("Authorization", "Bearer $token")
                }.build()
                chain.proceed(request)
            }
            .build()
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(http)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
