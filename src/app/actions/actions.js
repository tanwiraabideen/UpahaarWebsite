"use server"
import { PrismaClient } from "@/generated/prisma"
import { Prisma } from "@/generated/prisma"

const prisma = new PrismaClient
export async function getStories() {
    try {
        const stories = await prisma.Story.findMany()
        return stories
    } catch (error) {
        console.log('Error from getStories action, ', error)
        throw error
    }
}

export async function getPreviousEvents() {
    try {
        const previousEvents = await prisma.PreviousEvents.findMany()
        return previousEvents
    } catch (error) {
        console.log('Error from getPreviousEvents action, ', error)
        throw error
    }
}

export async function getUpcomingEvents() {
    try {
        const upcomingEvents = await prisma.UpcomingEvents.findMany()
        return upcomingEvents
    } catch (error) {
        console.log('Error from getPreviousEvents action, ', error)
        throw error
    }
}

export async function getTrustees() {
    try {
        const trustees = await prisma.trustees.findMany()
        return trustees
    } catch (error) {
        throw error
    }
}