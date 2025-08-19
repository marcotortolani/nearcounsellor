
import { Testimonial } from "@/components/testimonial-card";

export const allTestimonials: Omit<Testimonial, 'name' | 'message'>[] = [
    { country: "PT", photo: "https://placehold.co/100x100.png", photoHint: "friendly person", date: "2024-05-20", lang: 'pt' },
    { country: "AR", photo: "https://placehold.co/100x100.png", photoHint: "smiling woman", date: "2024-04-15", lang: 'es' },
    { country: "NZ", photo: "https://placehold.co/100x100.png", photoHint: "man with glasses", date: "2024-06-01", lang: 'en' },
    { country: "BR", photo: "https://placehold.co/100x100.png", photoHint: "person thinking", date: "2024-03-10", lang: 'pt' },
    { country: "GB", photo: "https://placehold.co/100x100.png", photoHint: "happy person", date: "2024-05-05", lang: 'en' },
    { country: "ES", photo: "https://placehold.co/100x100.png", photoHint: "woman looking away", date: "2024-02-22", lang: 'es' },
    { country: "US", photo: "https://placehold.co/100x100.png", photoHint: "professional person", date: "2024-06-11", lang: 'en'},
    { country: "MX", photo: "https://placehold.co/100x100.png", photoHint: "student smiling", date: "2024-01-30", lang: 'es'},
    { country: "PT", photo: "https://placehold.co/100x100.png", photoHint: "thoughtful person", date: "2024-03-25", lang: 'pt'},
];

    