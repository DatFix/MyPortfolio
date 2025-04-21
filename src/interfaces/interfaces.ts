export interface IProjectCardProps {
    id?: string;
    image: File | string | any,
    name: string,
    description: string,
    tools: string[],
    linkGithub: string,
    linkPreview: string,
    index?: number,
}

export interface IHeroProps {
    greeting: string,
    job: string,
    bio: string,
    avatarFile: File | string | any,
    cvFile: File | string | any,
}

export interface ISkillProps {
    skillName: string,
    iconName: string,
    iconLib: string,
    color: string,
    dbName: string,
}

export interface ITitleSectionProps{
    id?: string,
    title: string,
    description: string,
    sectionKey: string,
}

export interface IContactProps {
    email: string,
    phone: string,
    address: string,
}

export interface ISocialMediaProps{
    github: string,
    linkedin: string,
    instagram: string,
    facebook: string,
}