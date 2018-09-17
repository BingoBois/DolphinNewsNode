import { Request, Response } from 'express'

export let bingo = (req: Request, res: Response) => {
    res.send("85")
}

export let computerspil = (req: Request, res: Response) => {
    res.send("flash escape room")
}

