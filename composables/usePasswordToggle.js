export default function usePasswordToggle() {
    const passwordIcon = ref('fa fa-eye-slash');

    function handleShowPassword() {

        const passwordInputs = document.querySelectorAll('.form-password-toggle input');
        passwordInputs.forEach(function (input) {
            if (input.type === 'password') {
                input.type = 'text';
                passwordIcon.value = 'fas fa-eye';
            } else {
                input.type = 'password';
                passwordIcon.value = 'fa fa-eye-slash';
            }
        });
    }
    return {
        passwordIcon,
        handleShowPassword
    };
}