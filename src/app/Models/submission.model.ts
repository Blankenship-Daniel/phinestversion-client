export class Submission {
  constructor(
    public song_title         : string,
    public song_slug          : string,
    public submission_id      : number,
    public description        : string,
    public show_date          : string,
    public venue_name         : number,
    public venue_location     : number,
    public username           : string,
    public user_image         : string,
    public submission_score   : number
  ) {}
}
