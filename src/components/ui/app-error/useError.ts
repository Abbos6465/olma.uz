import {Ref, ref} from "vue";


type ErrorType = {
    status?: number;
    headline?: string,
    title?: string,
    text?: string,
    image?: string
}

interface ServerErrorType {
    status: number,
    statusText: string
}

interface useErrorType {
    setError: (newError: ErrorType) => void,
    error: Ref<ErrorType>,
    hasError: Ref<boolean>,
    clear: () => void,
    setNotFoundError: () => void,
    setServerError: (error: ServerErrorType) => void
}

const error = ref<ErrorType>({});
const hasError = ref<boolean>(false);

export default (): useErrorType => {

    const setError = (newError: ErrorType): void => {
        hasError.value = true;
        error.value = newError;
    }

    const clear = (): void => {
        hasError.value = false;
        error.value = {};
    }

    const setNotFoundError = () => {
        setError({
            status: 404,
            title: "Sahifa topilmadi",
            headline: "Voy, 404",
            text: "Siz qidirayotgan sahifa mavjud emas"
        });
    }

    const setServerError = (newError: ServerErrorType): void => {
        setError({
            status: newError.status,
            headline: `Error status ${newError.status}`,
            title: newError.statusText,
            text: "Serverda muammo sodir bo'ldi"
        })
    }


    return {
        setError,
        error,
        hasError,
        clear,
        setNotFoundError,
        setServerError
    }
}
