export interface Medico {
    id: number | null;
    tipo_id: string;
    num_medico_id: string;
    nombre_1: string;
    nombre_2?: string;
    apellido_1: string;
    apellido_2?: string;
    num_telefono: string;
    email: string;
}