import {notifications} from "@mantine/notifications";

export function showNotification(message: string, color: string = 'blue') {
    notifications.show({
        message,
        withCloseButton: false,
        color

    })
}

export function handleKeyPress(event) {
    const charCode = event.charCode || event.keyCode;
    if (charCode > 127) {
        event.preventDefault();
    }
}