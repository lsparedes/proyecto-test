<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Person;
use App\Http\Requests\Admin\PersonFormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PersonController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('persons'), 403);
        $person = Person::all();
        return view('admin.person.index', compact('person'));
    }


    public function create()
    {
        abort_if(Gate::denies('add-persons'), 403);
        return view('admin.person.create');
    }

    public function store(PersonFormRequest $request)
    {
        // Verificar si el usuario está autenticado
        if (Auth::check()) {
            $data = $request->validated();

            $person = new Person;
            $person->name = $data['name'];
            $person->last_name = $data['last_name'];
            $person->age = $data['age'];
            $person->genre = $data['genre'];

            // Acceder al id del usuario solo si está autenticado
            $person->created_by = Auth::user()->id;

            $person->save();

            return redirect('admin/persons')->with('message', 'Successfully Added');
        } else {
            // Manejar el caso en el que el usuario no está autenticado
            return redirect()->route('login')->with('message', 'Please log in first.');
        }
    }


    public function edit($person_id)
    {
        abort_if(Gate::denies('edit-person'), 403);
        $person = Person::find($person_id);
        return view('admin.person.edit', compact('person'));
    }

    public function update(PersonFormRequest $request, $person_id)
    {
        $data = $request->validated();

        $person = Person::find($person_id);
        $person->name = $data['name'];
        $person->last_name = $data['last_name'];
        $person->age = $data['age'];
        $person->genre = $data['genre'];
        $person->created_by = Auth::user()->id;
        $person->update();

        return redirect('admin/persons')->with('message', 'Successfully Update');
    }

    public function destroy($person_id)
    {
        abort_if(Gate::denies('delete-person'), 403);
        $person = Person::find($person_id);
        if ($person)
        {
            $person->delete();
            return redirect('admin/persons')->with('message', 'Successfully Deleted');
        } else {
            return redirect('admin/persons')->with('message', 'No Id found');
        }
    }
}
