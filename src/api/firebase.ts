import { db } from "../configs/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { IContactProps, IHeroProps, IProjectCardProps, ISkillProps, ISocialMediaProps, ITitleSectionProps } from "../interfaces/interfaces";
import { uploadFileToStorage } from "./cloudinary";
import { base64ToFile } from "../untils/untils";

export const createProject = async ({ name, description, tools, image, linkGithub, linkPreview }: IProjectCardProps) => {
    try {

        const imageProject = await uploadFileToStorage(image)

        await addDoc(collection(db, "projects"), {
            name: name,
            description: description,
            tools: tools,
            image: imageProject,
            linkGithub: linkGithub,
            linkPreview: linkPreview,
            createdAt: Timestamp.now(),
        });
    } catch (error) {
        console.error("Lỗi khi tạo project:", error);
    }
};

export const getProjects = async (): Promise<IProjectCardProps[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects: IProjectCardProps[] = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data() as IProjectCardProps
            }
        ));
        return projects;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách project:", error);
        return []
    }
}

export const updateProject = async ({ id, name, description, tools, image, linkGithub, linkPreview }: IProjectCardProps) => {
    try {

        let imageProject = image;

        // nếu là base64
        const isBase64Image = (img: unknown): img is string =>
            typeof img === "string" && img.startsWith("data:image/");

        if (isBase64Image(image)) {
            const file = base64ToFile(image);
            imageProject = await uploadFileToStorage(file);
        } else if (image instanceof File) {
            imageProject = await uploadFileToStorage(image);
        }

        if (!id) {
            throw new Error("Invalid ID: ID is undefined or null.");
        }

        await updateDoc(doc(db, "projects", id), {
            name: name,
            description: description,
            tools: tools,
            image: imageProject,
            linkGithub: linkGithub,
            linkPreview: linkPreview,
        });

        console.log(id, name, description, tools, image, linkGithub, linkPreview);
    } catch (error) {
        console.log("Lỗi khi cập nhật project:", error);
    }
}

export const editHero = async ({ greeting, job, bio, avatarFile, cvFile }: IHeroProps) => {
    try {
        const heroDocRef = doc(db, "hero", "main");
        const heroSnapshot = await getDoc(heroDocRef);

        if (heroSnapshot.exists()) {
            console.log("Đã tồn tại, tiến hành cập nhật...");
        } else {
            console.log("Chưa tồn tại, tiến hành tạo mới...");
        }

        let avatarUrl = "";
        let cvUrl = "";

        if (avatarFile || cvFile) {
            avatarUrl = avatarFile ? await uploadFileToStorage(avatarFile) : "";
            cvUrl = cvFile ? await uploadFileToStorage(cvFile) : "";
        }

        // Tạo hoặc cập nhật document
        await setDoc(heroDocRef, {
            greeting,
            job,
            bio,
            avatar: avatarUrl,
            cv: cvUrl,
        });

        return heroDocRef;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa hero:", error);
        throw error;
    }
};

export const getHero = async () => {
    try {
        const heroDocRef = doc(db, "hero", "main");
        const heroSnapshot = await getDoc(heroDocRef);
        return heroSnapshot.data();
    } catch (error) {
        console.error("Lỗi khi lấy hero:", error);
    }
}

export const editSkill = async ({ skillName, iconName, iconLib, color, dbName }: ISkillProps) => {
    try {
        const skillDocRef = collection(db, dbName);
        await addDoc(skillDocRef, {
            skillName,
            iconName,
            iconLib,
            color
        });
        return skillDocRef;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa skill:", error);
    }
}

export const getSkills = async () => {
    try {
        const skillsCollectionRef = collection(db, "skills");
        const skillsSnapshot = await getDocs(skillsCollectionRef);
        return skillsSnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Lỗi khi lấy skill:", error);
    }
}

export const getOrtherSkills = async () => {
    try {
        const skillsCollectionRef = collection(db, "orther-skills");
        const skillsSnapshot = await getDocs(skillsCollectionRef);
        return skillsSnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Lỗi khi lấy skill:", error);
    }
}

export const addTitleSection = async ({ title, description, sectionKey }: ITitleSectionProps) => {
    try {
        const titleSectionDocRef = collection(db, "title-sections");
        await addDoc(titleSectionDocRef, {
            title,
            description,
            sectionKey
        });
        return titleSectionDocRef;
    } catch (error) {
        console.error("Lỗi khi thêm title section:", error);
    }
}

export const getTitleSection = async () => {
    try {
        const titleSectionCollectionRef = collection(db, "title-sections");
        const titleSectionSnapshot = await getDocs(titleSectionCollectionRef);

        const data = titleSectionSnapshot.docs.map((doc) => ({
            id: doc.id, // ✅ Thêm dòng này để lấy ID của document
            ...doc.data(),
        }));

        return data;
    } catch (error) {
        console.error("Lỗi khi lấy title section:", error);
    }
};

export const updateTitleSection = async ({ id, title, description, sectionKey }: ITitleSectionProps) => {
    try {
        console.log(id, title, description, sectionKey);

        if (!id) {
            throw new Error("Invalid ID: ID is undefined or null.");
        }
        const titleSectionDocRef = doc(db, "title-sections", id);
        await updateDoc(titleSectionDocRef, {
            title,
            description,
            sectionKey
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật title section:", error);
    }
}

export const deleteTitleSection = async (id: string) => {
    try {
        const titleSectionDocRef = doc(db, "title-sections", id);
        await deleteDoc(titleSectionDocRef);
    } catch (error) {
        console.error("Lỗi khi xóa title section:", error);
    }
}

export const getTitleSectionByKey = async (sectionKey: string): Promise<ITitleSectionProps[]> => {
    try {
        const titleSectionCollectionRef = collection(db, "title-sections");
        const titleSectionQuery = query(titleSectionCollectionRef, where("sectionKey", "==", sectionKey));
        const titleSectionSnapshot = await getDocs(titleSectionQuery);
        const data = titleSectionSnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title || "",
            description: doc.data().description || "",
            sectionKey: doc.data().sectionKey || "",
        }));
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy title section theo key:", error);
        return []
    }
}

export const editContact = async ({ email, phone, address }: IContactProps) => {
    try {
        const contactDocRef = doc(db, "contacts", "main");
        await getDoc(contactDocRef);
        await setDoc(contactDocRef, {
            email,
            phone,
            address
        })

        return contactDocRef
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin liên hệ:", error);
    }
}

export const getContact = async (): Promise<IContactProps> => {
    try {
        const contactDocRef = doc(db, "contacts", "main");
        const contactDoc = await getDoc(contactDocRef);
        const contactData = contactDoc.data() || {};
        return contactData as IContactProps;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin liên hệ:", error);
        return {} as IContactProps;
    }
}

export const editSocial = async ({ github, linkedin, facebook, instagram }: ISocialMediaProps) => {
    try {
        const socialDocRef = doc(db, "socials", "main");
        await getDoc(socialDocRef);
        await setDoc(socialDocRef, {
            github,
            linkedin,
            facebook,
            instagram
        })
        return socialDocRef
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin mạng xã hội:", error);
    }
}

export const getSocial = async (): Promise<ISocialMediaProps> => {
    try {
        const socialDocRef = doc(db, "socials", "main");
        const socialDoc = await getDoc(socialDocRef);
        const socialData = socialDoc.data() || {};
        return socialData as ISocialMediaProps;
    }
    catch (error) {
        console.log("Lỗi khi lấy thông tin mạng xã hội", error);
        return {} as ISocialMediaProps;
    }
}
