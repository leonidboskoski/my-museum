
export type Details = {
    name: string;
    description: string;
    position: [number, number, number];
    cameraPosition: [number, number, number];
    cameraLookAt: [number, number, number];
}

export type Description = {
    name: string | null;
    description: string | null;
}

export type CameraTarget = {
    cameraPosition: number[] | null;
    cameraLookAt: number[] | null;
}


