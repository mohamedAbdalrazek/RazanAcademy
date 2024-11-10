

export type Post = {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    body: string;
    issuedAt: string
};

export interface RetrievedPost extends Post {
    id: string
}

export type GetPostResponse = {
    ok: boolean;
    message: string;
    count?:number;
    lastVisibleId:string ;
    posts: RetrievedPost[];
};

