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
        $role1 = Role::create(['name' => 'Admin']);
        $role2 = Role::create(['name' => 'Examinador']);
        $role3 = Role::create(['name' => 'Usuario']);


        Permission::create(['name' => 'dashboard'])->syncRoles([$role1, $role2]);

        Permission::create(['name' => 'administrador'])->syncRoles([$role1]);

        Permission::create(['name' => 'users'])->syncRoles([$role1]);
        Permission::create(['name' => 'add-user'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-user'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-user'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-user'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-user'])->syncRoles([$role1]);
        Permission::create(['name' => 'show-user'])->syncRoles([$role1]);

        Permission::create(['name' => 'persons'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-persons'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'edit-person'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-person'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'update-person'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-person'])->syncRoles([$role1]);

        Permission::create(['name' => 'tipotest'])->syncRoles([$role1]);
        Permission::create(['name' => 'add-tipotest'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-tipotest'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-tipotest'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-tipotest'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-tipotest'])->syncRoles([$role1]);

        Permission::create(['name' => 'tests'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-tests'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-tests'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-tests'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-tests'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-tests'])->syncRoles([$role1]);

        Permission::create(['name' => 'examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'store-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'edit-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'update-examinador-persona-test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'delete-examinador-persona-test'])->syncRoles([$role1]);

        Permission::create(['name' => 'pregunta'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-pregunta'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-pregunta'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-pregunta'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-pregunta'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-pregunta'])->syncRoles([$role1]);

        Permission::create(['name' => 'preguntas-y-alternativas'])->syncRoles([$role1, $role2]);

        Permission::create(['name' => 'alternativa'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-alternativa'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-alternativa'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-alternativa'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-alternativa'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-alternativa'])->syncRoles([$role1]);

        Permission::create(['name' => 'respuesta'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-respuesta'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-respuesta'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-respuesta'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-respuesta'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-respuesta'])->syncRoles([$role1]);

        Permission::create(['name' => 'criterio-evaluacion'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-criterio-evaluacion'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-criterio-evaluacion'])->syncRoles([$role1]);

        Permission::create(['name' => 'formula'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-formula'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-formula'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-formula'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-formula'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-formula'])->syncRoles([$role1]);

        Permission::create(['name' => 'metrica'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-metrica'])->syncRoles([$role1]);
        Permission::create(['name' => 'store-metrica'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-metrica'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-metrica'])->syncRoles([$role1]);
        Permission::create(['name' => 'delete-metrica'])->syncRoles([$role1]);

        Permission::create(['name' => 'criterio_evaluacion_test'])->syncRoles([$role1, $role2]);
        Permission::create(['name' => 'add-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::create(['name' => 'store.criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::create(['name' => 'edit-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::create(['name' => 'update-criterio_evaluacion_test'])->syncRoles([$role1]);
        Permission::create(['name' => 'criterio_evaluacion_test.destroy'])->syncRoles([$role1]);

        Permission::create(['name' => 'permissions'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.create'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.edit'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.store'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.show'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.update'])->syncRoles([$role1]);
        Permission::create(['name' => 'permissions.destroy'])->syncRoles([$role1]);

        Permission::create(['name' => 'roles'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.create'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.edit'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.store'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.show'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.update'])->syncRoles([$role1]);
        Permission::create(['name' => 'roles.destroy'])->syncRoles([$role1]);


    }
}
