import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "HOME",
        about: "ABOUT US",
        products: "PRODUCTS",
        manufacturing: "Manufacturing",
        gallery: "GALLERY",
        certificates: "Certificates",
        contact: "CONTACT",
        login: "Login",
        register: "Register",
        logout: "Logout",
        dashboard: "Dashboard",
        cms: "Content Management",
        profile: "Profile"
      },
      hero: {
        title: "Premium Quality Olive Products",
        subtitle: "Exporting Excellence Since 1980",
        cta: "Discover Our Products"
      },
      footer: {
        about: "About Us",
        quickLinks: "Quick Links",
        contact: "Contact Info",
        followUs: "Follow Us",
        rights: "All rights reserved"
      },
      auth: {
        individual: "Individual Registration",
        company: "Company Registration",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        password: "Password",
        phone: "Phone Number",
        companyName: "Company Name",
        registrationNumber: "Registration Number",
        taxId: "Tax ID",
        contactPerson: "Contact Person",
        address: "Address",
        registerBtn: "Register",
        loginBtn: "Login",
        haveAccount: "Already have an account?",
        noAccount: "Don't have an account?",
        registerHere: "Register here",
        loginHere: "Login here"
      },
      profile: {
        title: "Profile",
        subtitle: "Manage your account information",
        email: "Email",
        accountType: "Account Type",
        name: "Name",
        companyName: "Company Name",
        contactPerson: "Contact Person",
        phone: "Phone",
        individual: "Individual",
        company: "Company",
        admin: "Admin"
      },
      cms: {
        editContent: "Edit Content",
        editHero: "Edit Hero",
        editAbout: "Edit About",
        save: "Save",
        cancel: "Cancel",
        sections: "Sections"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        products: "المنتجات",
        manufacturing: "التصنيع",
        gallery: "المعرض",
        certificates: "الشهادات",
        contact: "اتصل بنا",
        login: "تسجيل الدخول",
        register: "التسجيل",
        logout: "تسجيل الخروج",
        dashboard: "لوحة التحكم",
        cms: "إدارة المحتوى",
        profile: "الملف الشخصي"
      },
      hero: {
        title: "منتجات زيتون بجودة عالمية",
        subtitle: "نصدر التميز منذ 1980",
        cta: "اكتشف منتجاتنا"
      },
      footer: {
        about: "من نحن",
        quickLinks: "روابط سريعة",
        contact: "معلومات التواصل",
        followUs: "تابعنا",
        rights: "جميع الحقوق محفوظة"
      },
      auth: {
        individual: "تسجيل فردي",
        company: "تسجيل شركة",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        phone: "رقم الهاتف",
        companyName: "اسم الشركة",
        registrationNumber: "رقم السجل التجاري",
        taxId: "الرقم الضريبي",
        contactPerson: "الشخص المسؤول",
        address: "العنوان",
        registerBtn: "تسجيل",
        loginBtn: "دخول",
        haveAccount: "لديك حساب بالفعل؟",
        noAccount: "ليس لديك حساب؟",
        registerHere: "سجل هنا",
        loginHere: "سجل دخول هنا"
      },
      profile: {
        title: "الملف الشخصي",
        subtitle: "إدارة معلومات حسابك",
        email: "البريد الإلكتروني",
        accountType: "نوع الحساب",
        name: "الاسم",
        companyName: "اسم الشركة",
        contactPerson: "جهة الاتصال",
        phone: "الهاتف",
        individual: "فرد",
        company: "شركة",
        admin: "مدير"
      },
      cms: {
        editContent: "تعديل المحتوى",
        editHero: "تعديل البانر",
        editAbout: "تعديل من نحن",
        save: "حفظ",
        cancel: "إلغاء",
        sections: "الأقسام"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "INICIO",
        about: "SOBRE NOSOTROS",
        products: "PRODUCTOS",
        manufacturing: "Fabricación",
        gallery: "GALERÍA",
        certificates: "Certificados",
        contact: "CONTACTO",
        login: "Iniciar sesión",
        register: "Registrarse",
        logout: "Cerrar sesión",
        dashboard: "Panel",
        cms: "Gestión de Contenido",
        profile: "Perfil"
      },
      hero: {
        title: "Productos de Aceituna Premium",
        subtitle: "Exportando Excelencia Desde 1980",
        cta: "Descubre Productos"
      },
      footer: {
        about: "Sobre Nosotros",
        quickLinks: "Enlaces",
        contact: "Contacto",
        followUs: "Síguenos",
        rights: "Todos los derechos reservados"
      },
      auth: {
        individual: "Registro Individual",
        company: "Registro Empresa",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo",
        password: "Contraseña",
        phone: "Teléfono",
        companyName: "Nombre Empresa",
        registrationNumber: "Registro",
        taxId: "NIF",
        contactPerson: "Contacto",
        address: "Dirección",
        registerBtn: "Registrar",
        loginBtn: "Entrar",
        haveAccount: "¿Ya tienes cuenta?",
        noAccount: "¿No tienes cuenta?",
        registerHere: "Regístrate",
        loginHere: "Inicia sesión"
      },
      profile: {
        title: "Perfil",
        subtitle: "Administra la información de tu cuenta",
        email: "Correo Electrónico",
        accountType: "Tipo de Cuenta",
        name: "Nombre",
        companyName: "Nombre de la Empresa",
        contactPerson: "Persona de Contacto",
        phone: "Teléfono",
        individual: "Individual",
        company: "Empresa",
        admin: "Administrador"
      },
      cms: {
        editContent: "Editar",
        editHero: "Editar Banner",
        editAbout: "Editar Sobre",
        save: "Guardar",
        cancel: "Cancelar",
        sections: "Secciones"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;