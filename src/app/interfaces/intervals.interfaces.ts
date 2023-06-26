export interface Interval {
    interval: number;
    followingWin: string;
    previousWin: string;
    producer: string;
  }

export interface MinMaxInterval {
  min: Interval[],
  max: Interval[]
}