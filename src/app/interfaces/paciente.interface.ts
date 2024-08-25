export interface Paciente {
    id: number | null;
    tipo_id: string;
    num_paciente_id: string;
    nombre_1: string;
    nombre_2?: string;
    apellido_1: string;
    apellido_2?: string;
    pais: string;
    ciudad: string;
    direccion: string;
    fecha_nacimiento: Date | null;
    num_telefono: string;
    email: string;
}
