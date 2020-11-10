package com.npi_grupo4.guiaestudiantes

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.fragment_inicio_sesion.*
import kotlinx.android.synthetic.main.fragment_inicio_sesion.view.*
import android.widget.*
import android.widget.ArrayAdapter
import android.widget.Spinner

/**
 * A simple [Fragment] subclass.
 * Use the [InicioSesion.newInstance] factory method to
 * create an instance of this fragment.
 */
class InicioSesion : Fragment(), AdapterView.OnItemSelectedListener {
    // TODO: Rename and change types of parameters

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        return inflater.inflate(R.layout.fragment_inicio_sesion, container, false)



    }

    //SPINNER

    override fun onItemSelected(parent: AdapterView<*>, view: View?, pos: Int, id: Long) {
        val texto: String = parent.getItemAtPosition(pos).toString()
    }

    override fun onNothingSelected(parent: AdapterView<*>) {
        // Another interface callback
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter.createFromResource(
                requireContext(),
                R.array.facultades,
                android.R.layout.simple_spinner_item
        ).also { adapter ->
            // Specify the layout to use when the list of choices appears
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            // Apply the adapter to the spinner
            facultad_spinner.adapter = adapter
            facultad_spinner.onItemSelectedListener = this
        }

        botonContinuar.setOnClickListener({
            val navigation = Navigation.findNavController(view)
            navigation.navigate(R.id.action_inicioSesion_to_paginaInicio)
        })
    }


}