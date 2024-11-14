export interface INote{
   _id: string;
    title: string;
    content: string;
    createdAt: string;
}
export interface INoteBEResponse {
    success: boolean;
    notes: {
        metadata: {
            totalCount: number;
            page: number;
            perPage: number;
        };
        data: INote[];
    };
}

export interface INewNote{
    title: string;
    content: string;
}