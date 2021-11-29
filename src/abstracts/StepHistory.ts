export default abstract class StepHistory<T> {
  history: T[];
  backups: T[][];
  _historyStep: number;

  constructor() {
    this.history = [];
    this.backups = [];
    this._historyStep = 0;
  }

  get historyStep(): number {
    return this._historyStep;
  }

  set historyStep(step: number) {
    this._historyStep = Math.min(Math.max(step, this.history.length * -1), 0);
    this.onHistoryUpdate();
  }

  abstract onHistoryUpdate(): void;
  abstract onBackupCreate(): void;

  addToHistory(step: T): void {
    if (this.historyStep < 0) {
      this.history = this.history.slice(0, this.historyStep);
    }
    this.history.push(step);
    this.historyStep = 0;
  }

  revert(): void {
    this.historyStep -= 1;
  }

  restore(): void {
    this.historyStep += 1;
  }

  createBackup() {
    this.backups.push(this.history.slice(0));
  }

  applyBackup() {
    this.history = this.backups.pop() ?? this.history;
    this.historyStep = 0;
  }

  getHistoryState(): T[] {
    return this.historyStep
      ? this.history.slice(0, this.historyStep)
      : this.history.slice(0);
  }
}
