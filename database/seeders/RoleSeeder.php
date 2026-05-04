<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::firstOrCreate(['name' => 'Admin']);
        $role2 = Role::firstOrCreate(['name' => 'Examinador']);
        $role3 = Role::firstOrCreate(['name' => 'Usuario']);


        Permission::firstOrCreate(['name' => 'dashboard'])->syncRoles([$role1, $role2]);

        Permission::firstOrCreate(['name' => 'administrador'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'users'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'add-user'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-user'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-user'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-user'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-user'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'show-user'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'persons'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-persons'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'edit-person'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-person'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'update-person'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-person'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'tipotest'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'add-tipotest'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-tipotest'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-tipotest'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-tipotest'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-tipotest'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'tests'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-tests'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-tests'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-tests'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-tests'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-tests'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'store-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'edit-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'update-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'delete-examinador-persona-test'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'pregunta'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-pregunta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-pregunta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-pregunta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-pregunta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-pregunta'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'preguntas-y-alternativas'])->syncRoles([$role1, $role2]);

        Permission::firstOrCreate(['name' => 'alternativa'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-alternativa'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-alternativa'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-alternativa'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-alternativa'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-alternativa'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'respuesta'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-respuesta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-respuesta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-respuesta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-respuesta'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-respuesta'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'criterio-evaluacion'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-criterio-evaluacion'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'formula'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-formula'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-formula'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-formula'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-formula'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-formula'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'metrica'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-metrica'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store-metrica'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-metrica'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-metrica'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'delete-metrica'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'criterio_evaluacion_test'])->syncRoles([$role1, $role2]);
        Permission::firstOrCreate(['name' => 'add-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'store.criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'edit-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'update-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'criterio_evaluacion_test.destroy'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'permissions'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.create'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.edit'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.store'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.show'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.update'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'permissions.destroy'])->syncRoles([$role1]);

        Permission::firstOrCreate(['name' => 'roles'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.create'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.edit'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.store'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.show'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.update'])->syncRoles([$role1]);
        Permission::firstOrCreate(['name' => 'roles.destroy'])->syncRoles([$role1]);


    }
}
