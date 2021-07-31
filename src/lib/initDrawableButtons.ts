import Canvas, { DrawOptions } from "./Canvas";

export default function initDrawableButtons(canvas: Canvas): string[] {
    const buttons = document.querySelectorAll("[data-drawable]") as NodeListOf<HTMLButtonElement>;
    const addDrawableButtonListener = addDrawableButtonListenerFactory(canvas);
    buttons.forEach(addDrawableButtonListener);

    return getButtonKeys(buttons);
}

function addDrawableButtonListenerFactory(canvas: Canvas) {
    return (button: HTMLButtonElement) => {
            button.addEventListener("click", () => {
            const drawableKey = ((button as HTMLButtonElement).dataset.drawable as keyof DrawOptions | undefined);
    
            if (drawableKey) {
                canvas.active = drawableKey
            }
        })
    }
} 

function getButtonKeys(buttons: NodeListOf<HTMLButtonElement>): string[] {
    const keys = [] as string[];

    buttons.forEach(button => {
        const key = button.dataset.drawable;
        if(key) {
            keys.push(key)
        }
    })

    return keys;
}