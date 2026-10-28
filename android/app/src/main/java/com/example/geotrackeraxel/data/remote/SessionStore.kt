package com.example.geotrackeraxel.data.remote

import android.content.Context

class SessionStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences("geotracker_session", Context.MODE_PRIVATE)
    fun token(): String = prefs.getString("jwt", "") ?: ""
    fun save(token: String) { prefs.edit().putString("jwt", token).apply() }
    fun clear() { prefs.edit().remove("jwt").apply() }
}
