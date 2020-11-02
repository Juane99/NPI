package com.npi_grupo4.guiaestudiantes

import android.location.Location
import androidx.fragment.app.Fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.google.android.gms.location.LocationServices

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.maps.android.data.kml.KmlLayer

class SitiosInteres : Fragment() {



    private val callback = OnMapReadyCallback { googleMap ->
        /**
         * Manipulates the map once available.
         * This callback is triggered when the map is ready to be used.
         * This is where we can add markers or lines, add listeners or move the camera.
         * In this case, we just add a marker near Sydney, Australia.
         * If Google Play services is not installed on the device, the user will be prompted to
         * install it inside the SupportMapFragment. This method will only be triggered once the
         * user has installed Google Play services and returned to the app.
         */

//        var lm: LocationManager? = getSystemService(Context.LOCATION_SERVICE) as LocationManager?
//        val location: Location? = lm!!.getLastKnownLocation(LocationManager.GPS_PROVIDER)
//        val longitude: Double = location.getLongitude()
//        val latitude: Double = location.getLatitude()


        GestorPermisos.getLocationPermission(requireContext(), requireActivity())
        var location = LocationServices.getFusedLocationProviderClient(requireContext())

        var position = LatLng(37.1886273, -3.5907775 )

        googleMap.moveCamera(CameraUpdateFactory.newLatLng(position))
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(position, 16.0F))

        if (GestorPermisos.locationPermissionGranted()) {
            location.lastLocation.addOnSuccessListener { loc: Location? ->

                if ( loc != null){
                    var position = LatLng(loc!!.latitude, loc!!.longitude)

                    googleMap.moveCamera(CameraUpdateFactory.newLatLng(position))
                    googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(position, 16.0F))
                } else {
                    Toast.makeText(requireActivity(), "Activa la ubicacion. Centrando en Granada", Toast.LENGTH_LONG).show()

                }


            }
        }


        val kmlFile = KmlLayer(googleMap, R.raw.sitios_interes, requireActivity())
        kmlFile.addLayerToMap()
        //Toast.makeText(requireActivity(), "HOLASF", Toast.LENGTH_LONG).show()


//        val ETSIIT = LatLng(37.197055556, -3.624111111)
//        googleMap.addMarker(MarkerOptions().position(ETSIIT).title("Marker in ETSIIT"))
//        googleMap.moveCamera(CameraUpdateFactory.newLatLng(ETSIIT))
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment = childFragmentManager.findFragmentById(R.id.map) as SupportMapFragment?
        GestorPermisos.getLocationPermission(requireContext(), requireActivity())
        mapFragment?.getMapAsync(callback)
    }


    override fun onCreateView(inflater: LayoutInflater,
                              container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_sitios_interes, container, false)
    }


}