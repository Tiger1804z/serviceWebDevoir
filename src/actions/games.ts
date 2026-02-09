'use server'

import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath} from "next/cache";
import { Platform,GameStatus } from "@/generated/prisma/enums";


// ajouter un jeu 

export async function addGame(data:{
    title:string,
    platform:Platform,
    status?:GameStatus ,
    rating?:number,
    imageUrl?:string
    isPublic:boolean
}) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    await prisma.game.create({
        data:{
            ...data,
            userId
        }
    })
    revalidatePath("/dashboard")
}



// recuperer les jeux d'un utilisateur

export async function getUserGames(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    return await prisma.game.findMany({
        where:{
            userId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}

// modifier un jeu avec verification de l'utilisateur

export async function updateGame(
    gameId:number,
    data:{
        title?:string,
        platform?:Platform,
        status?:GameStatus,
        rating?:number,
        imageUrl?:string
        isPublic?:boolean
    }
) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const game = await prisma.game.findUnique({
        where:{
            id:gameId
        }
    })
    if(!game || game.userId !== userId) throw new Error("Unauthorized");

    await prisma.game.update({
        where:{
            id:gameId
        },
        data
    })
    revalidatePath("/dashboard")
}

// supprimer un jeu avec verification de l'utilisateur
export async function deleteGame(gameId:number) {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const game = await prisma.game.findUnique({
        where:{
            id:gameId
        }
    })
    if(!game || game.userId !== userId) throw new Error("Unauthorized");

    await prisma.game.delete({
        where:{
            id:gameId
        }    })
    revalidatePath("/dashboard")
}

// recuperer les jeux publics

export async function getPublicGames(){
    return await prisma.game.findMany({
        where:{
            isPublic:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
}