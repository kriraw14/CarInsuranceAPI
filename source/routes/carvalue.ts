import express, { Request, Response } from "express";
import { Router } from "express";

enum Alphabet {
    A = 1,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
}

interface Car {
    model: string;
    year: number;
}

const valueRouter: Router = express.Router();

valueRouter.post("/carvalue", (req: Request, res: Response) => {
    const { model, year }: Car = req.body;
    
    if (![model, year].every(Boolean)) {
        return res.status(400).json({ error: "Please input a model and year." });
    }

    if (year < 1894) {
        return res
            .status(400)
            .json({ error: "Please input a valid year above 1893." });
    }
    if (typeof model !== "string") {
        return res.status(400).json({ error: "Invalid model" });
    }

    if (typeof year !== "number") {
        return res.status(400).json({ error: "Invalid year" });
    }
    
    const wordArray: string[] = model.toUpperCase().replace(/[\s-]/g, "").split("");

    const convertedVal: number = wordArray.reduce((acc: number, letter: string) => {
        if (Object.keys(Alphabet).includes(letter)) {
            const alphabetKey: keyof typeof Alphabet = letter as keyof typeof Alphabet;
            return acc + Alphabet[alphabetKey];
        } else if (!Number.isNaN(parseInt(letter))) {
            return acc + parseInt(letter);
        } else {
            return acc;
        }
    }, 0);

    const carValue: number = convertedVal * 100 + year;

    res.json({ carValue });
});

export default valueRouter;
