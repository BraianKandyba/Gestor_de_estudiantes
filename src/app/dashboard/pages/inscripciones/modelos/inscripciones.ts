import { Alumnos } from "../../alumnos/modelos/alumnos";
import { Cursos } from "../../cursos/modelos/cursos";

export interface inscripciones {
    id: string | number;
    usuarioId: string | number;
    cursoId: string | number;
    usuario?: Alumnos 
    curso?: Cursos
}

export interface CrearInscripcionesData {
    usuarioId: string | number | null;
    cursoId: string | number | null;
}