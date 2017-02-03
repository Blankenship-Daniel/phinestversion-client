export class SongRank {
  constructor(
    public song_id      : number,
    public title        : string,
    public slug         : string,
    public tracks_count : number,
    public score        : number
  ) {}
}
