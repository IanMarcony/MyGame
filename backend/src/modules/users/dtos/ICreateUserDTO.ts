export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  bith_date: Date;
  url_profile_photo: string;
  url_banner_photo: string;
  description: string;
}
