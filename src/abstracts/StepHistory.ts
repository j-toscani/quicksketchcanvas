export default abstract class StepHistory<T> {
    history: T[];
    _historyStep: number;

    constructor() {
        this.history = []
        this._historyStep = 0
    }

    get historyStep(): number {
      return this._historyStep;
    }
  
    set historyStep(step: number) {
      this._historyStep = Math.min(Math.max(step, this.history.length * -1), 0);
      this.onHistoryUpdate();
    }

    abstract onHistoryUpdate():void

    addToHistory(step: T): void {
        if (this.historyStep < 0) {
          this.history = this.history.slice(this.historyStep);
          this.historyStep = 0;
        }
        this.history.push(step);
      }
    
      revert(): void {
        this.historyStep -= 1;
      }
    
      restore(): void {
        this.historyStep += 1;
      }
    
      getHistoryState(): T[] {
        return this.historyStep
          ? this.history.slice(0, this.historyStep)
          : this.history.slice(0);
      }
}