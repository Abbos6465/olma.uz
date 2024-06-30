import {reactive, ref} from "vue";
import {findIndex, generateRandomID} from "@/utils/helper";

interface Toast {
    id: string,
    text: string,
    type: string
}

const DURATION = ref(4000);
const items: Toast[] = reactive([]);

interface ToastParamsType {
    id?: string,
    text: string,
    duration?: number,
}

interface InitParamsType extends  ToastParamsType {
    type: 'success' | 'error' | 'warning';
}

export default () => {
    const toast = {
        success: (params: ToastParamsType): string => {
            return init({
                ...params,
                type: "success"
            });
        },
        error: (params: ToastParamsType): string => {
            return init({
                ...params,
                type: "error"
            });
        },
        warning: (params: ToastParamsType): string => {
            return init({
                ...params,
                type: "warning"
            });
        }
    }

    const init = (params: InitParamsType): string => {
        const id: string = params?.id ?? generateRandomID();

        if (items.find(el => el.id === id)) return "";

        items.push({
            id,
            text: params.text,
            type: params.type
        });

        setTimeout(() => {
            deleteFunction(id);
        }, params?.duration ?? DURATION.value)

        return id;
    }

    const deleteFunction = (id: string) => {
        const itemCollections:NodeListOf<HTMLDivElement> = document.querySelectorAll('.app-toast__item');
        const foundedItem:HTMLDivElement | undefined = Array.from(itemCollections).find((el: HTMLElement) => el.id === id);

        if (foundedItem) {
            const isHovered = foundedItem.getAttribute('isHovered');
            if (isHovered && +isHovered) return deleteFunction(id);
        }

        const index: number = findIndex(items, 'id', id);
        if(index !== -1) items.splice(index, 1);
    }

    return {
        toast,
        items,
        delete: deleteFunction
    }
}
