const API_URL = 'http://localhost:8080/api/perfil';

export const perfilService = {
    obtenerPerfil: async (id: number) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al obtener perfil');
        const data = await response.json();
        return data[0];
    },

    actualizarPerfil: async (id: number, data: any) => {
        const body = {
            nombres: data.nombres,
            apellidos: data.apellidos,
            numero: data.numero,
            foto_url: data.foto_url,
        }
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error('Error al actualizar perfil');
        return await response.text();
    },

    cambiarPassword: async (id: number, passwordActual: string, nuevaPass: string) => {
        const response = await fetch(`${API_URL}/cambiar_pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id.toString(),
                passwordActual: passwordActual,
                nueva_pass: nuevaPass
            }),
        });
        if (!response.ok) throw new Error('Error al cambiar contraseña');
        return await response.text();
    }
};
