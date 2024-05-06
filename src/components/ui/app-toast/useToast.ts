import {reactive, ref} from "vue";
import {generateRandomID} from "@/utils/helper";

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
        const itemCollections = document.querySelectorAll('.app-toast__item');
        const foundedItem = Array.from(itemCollections).find((el: HTMLElement) => el.id === id);



        if (foundedItem?.attributes?.isHovered && +foundedItem?.attributes?.isHovered.value) {
            return deleteFunction(id);
        }

        const index: number = items.findIndex(item => item.id == id);
        items.splice(index, 1);
    }

    return {
        toast,
        items,
        delete: deleteFunction
    }
}
