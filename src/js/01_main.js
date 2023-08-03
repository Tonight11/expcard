const { createApp, ref, computed, watch, onMounted } = Vue;

createApp({
	setup() {
		const modal = ref(false);
		const name = ref('');
		const phone = ref(null);
		const questionPhone = ref(null);
		const check = ref(false);
		const email = ref('');
		const liveErr = ref(false);
		const errors = ref({
			name: false,
			phone: false,
			check: false,
			email: false,
		});
		const phoneRegex =
			/^(\+7|7|8)?[\s\-]?\(?[1-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

		const qeustionText = ref('');

		const openModal = () => {
			modal.value = true;
			resetForm();
			scrollLock.enablePageScroll();
			scrollLock.disablePageScroll();
		};

		const closeModal = () => {
			modal.value = false;
			resetForm();
			document.body.classList.remove('lock');
			scrollLock.enablePageScroll();
		};

		const validateName = () => {
			errors.value.name = name.value.length === 0;
		};

		const validatePhone = () => {
			let phoneValue = phone.value ? phone.value.value : '';
			if (phoneValue.length === 17) {
				phoneValue = phoneValue.substring(phoneValue.length - 1, 1);
			}
			if (phoneValue.length === 0) {
				errors.value.phone = '*поле обязательно для заполнения';
			} else if (!phoneRegex.test(phoneValue)) {
				errors.value.phone = '*введите корректный номер телефона';
			} else {
				errors.value.phone = false;
			}
		};

		const validateQuestionPhone = () => {
			let phoneValue = questionPhone.value ? questionPhone.value.value : '';
			console.log(phoneValue);
			if (phoneValue.length === 17) {
				phoneValue = phoneValue.substring(phoneValue.length - 1, 1);
			}
			if (phoneValue.length === 0) {
				errors.value.phone = true;
			} else if (!phoneRegex.test(phoneValue)) {
				errors.value.phone = true;
			} else {
				errors.value.phone = false;
			}
		};

		const validateCheck = () => {
			errors.value.check = !check.value;
		};

		const validateEmail = () => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (email.value.length === 0) {
				errors.value.email = false;
				return;
			}
			if (email.value.length > 0) {
				errors.value.email = !emailRegex.test(email.value);
			}
		};
		const formatEmail = () => {
			email.value = email.value.replace(/[^a-zA-Z0-9.@_-]/g, '');
		};

		const filterName = () => {
			name.value = name.value.replace(
				/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
				''
			);
		};

		const checkPhoneValidate = () => {
			if (liveErr.value) {
				validatePhone();
			}
		};
		const checkQuestionPhoneValidate = () => {
			if (liveErr.value) {
				validateQuestionPhone();
			}
		};

		watch([name, check, email], currentValue => {
			if (liveErr.value) {
				validateName();
				validateCheck();
				validateEmail();
			}
		});

		const validateForm = () => {
			validateName();
			validatePhone();
			validateCheck();
			validateEmail();
		};
		const validateQuestionForm = () => {
			validateName();
			validateQuestionPhone();
			validateCheck();
		};

		const sendEmail = () => {
			validateForm();
			if (!isFormValid.value) {
				liveErr.value = true;
				return;
			}

			try {
				console.log({
					name: name.value,
					phone: phone.value.value,
					email: email.value || 'Нет',
					check: check.value,
				});
				closeModal();
			} catch (error) {
				console.log(error);
			} finally {
				resetForm();
			}
		};

		const sendQuestion = () => {
			validateQuestionForm();

			if (!isFormValid.value) {
				liveErr.value = true;
				return;
			}

			try {
				console.log({
					name: name.value,
					phone: questionPhone.value.value,
					text: qeustionText.value,
					check: check.value,
				});
			} catch (error) {
				console.log(error);
			} finally {
				resetForm();
			}
		};

		const resetForm = () => {
			name.value = '';
			phone.value.value = '';
			questionPhone.value.value = '';
			qeustionText.value = '';
			email.value = '';
			check.value = false;
			liveErr.value = false;
			errors.value.name = false;
			errors.value.phone = false;
			errors.value.check = false;
			errors.value.email = false;
		};

		const isFormValid = computed(() => {
			return !Object.values(errors.value).some(error => error);
		});

		onMounted(() => {
			document.body.addEventListener('keyup', e => {
				if (e.keyCode === 27) {
					closeModal();
				}
			});
		});

		return {
			modal,
			openModal,
			closeModal,
			name,
			phone,
			check,
			email,
			errors,
			sendEmail,
			isFormValid,
			formatEmail,
			checkPhoneValidate,
			filterName,
			qeustionText,
			sendQuestion,
			checkQuestionPhoneValidate,
			questionPhone,
		};
	},
}).mount('#app');

const swiper = new Swiper('.swiper-first', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	autoplay: {
		delay: 3000,
	},
	loop: true,
});
const parnterSwiper = new Swiper('.swiper-container-free-mode', {
	centeredSlides: true,
	loop: true,
	loopedSlides: 4,
	freeMode: true,
	slidesPerView: 'auto',
	autoplay: {
		delay: 1,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	speed: 2000,
	grabCursor: false,
});

const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.navigation');
const topBtn = document.querySelector('.top-btn');
const topMenuContainer = document.querySelector('.top-nav');
const btnTheme = document.querySelectorAll('.switch-theme');
const btnThemeLight = document.querySelector('.light-theme-btn');
const btnThemeDark = document.querySelector('.dark-theme-btn');
const themes = {
	light: 'light',
	dark: 'dark',
};
let header;
let screenWidth;

function toggleMenuItem(item) {
	item.classList.toggle('open');
	const menuItems = document.querySelectorAll('.menu__item');
	menuItems.forEach(function (menuitem) {
		if (menuitem !== item) {
			menuitem.classList.remove('open');
		}
	});
}

function handleMenuClick(event) {
	const clickedMenuItem = event.target.closest('.menu__item');
	if (!clickedMenuItem) return;

	toggleMenuItem(clickedMenuItem);
}

function initializeBurgerMenu() {
	const menuLink = document.querySelectorAll('.menu a');

	burgerMenu.addEventListener('click', function () {
		menu.classList.toggle('active');
		burgerMenu.classList.toggle('active');
		nav.classList.toggle('active');

		if (document.body.classList.contains('lock')) {
			document.body.classList.remove('lock');
			scrollLock.enablePageScroll();
		} else {
			document.body.classList.add('lock');
			scrollLock.disablePageScroll();
		}
	});

	menuLink.forEach(e =>
		e.addEventListener('click', () => {
			menu.classList.remove('active');
			burgerMenu.classList.remove('active');
			nav.classList.remove('active');
			document.body.classList.remove('lock');
			scrollLock.enablePageScroll();
		})
	);
}

function handleScroll() {
	const navRect = nav.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const headerRect = header.getBoundingClientRect();
	if (navRect.bottom <= 0) {
		topMenuContainer.classList.add('fixed');
	} else {
		topMenuContainer.classList.remove('fixed');
	}

	if (scrollTop > navRect.top && screenWidth <= 687) {
		nav.classList.add('fixed');
	} else {
		nav.classList.remove('fixed');
	}

	if (scrollTop > headerRect.bottom) {
		topBtn.classList.add('active');
	} else {
		topBtn.classList.remove('active');
	}
}

function scrollToTop() {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const distance = -scrollTop;
	const speed = 10;

	function scrollAnimation() {
		scrollTop += distance / speed;
		window.scrollTo(0, scrollTop);

		if (scrollTop > 0) {
			window.requestAnimationFrame(scrollAnimation);
		}
	}

	scrollAnimation();
}

function moveBurgerMenu() {
	header = document.querySelector('.header');
	screenWidth = window.innerWidth;
	const topMenu = document.querySelector('.top-nav__container');

	if (screenWidth <= 687 && !menu.contains(topMenu)) {
		menu.insertBefore(topMenu, menu.lastChild);
		header.insertAdjacentElement('beforebegin', nav);
		const menuBtn = document.querySelector('.menu button');
		menuBtn.addEventListener('click', () => {
			menu.classList.remove('active');
			burgerMenu.classList.remove('active');
			nav.classList.remove('active');
		});
	} else if (screenWidth > 687 && menu.contains(topMenu)) {
		topMenuContainer.insertBefore(topMenu, topMenuContainer.lastChild);
		header.insertAdjacentElement('afterend', nav);
	}
}

function activeLink() {
	const currentPage = window.location.pathname;
	const navLinks = document.querySelectorAll('a.menu__link');

	if (currentPage === '/' || currentPage === 'index.html') {
		navLinks.item(0).classList.add('active');
		return;
	}

	navLinks.forEach(link => {
		const linkPath = link.getAttribute('href').split('.')[0];

		if (linkPath === currentPage.split('.')[0]) {
			link.classList.add('active');
		}
	});
}

const partnerA = document.querySelector('.partner-a');
const partnerAk = document.querySelector('.partner-ak');
const partnerAkado = document.querySelector('.partner-akado');
const partnerTelecom = document.querySelector('.partner-telecom');
const partnerVtb = document.querySelector('.partner-vtb');

function partnerLight() {
	if (partnerA !== null) {
		partnerA.setAttribute('src', 'img/partner/light/light_a.png');
		partnerAk.setAttribute('src', 'img/partner/light/light_ak.png');
		partnerAkado.setAttribute('src', 'img/partner/light/light_akado.png');
		partnerTelecom.setAttribute('src', 'img/partner/light/light_telecom.png');
		partnerVtb.setAttribute('src', 'img/partner/light/light_vtb.png');
	}
}

function partnerDark() {
	if (partnerA !== null) {
		partnerA.setAttribute('src', 'img/partner/dark/dark_a.png');
		partnerAk.setAttribute('src', 'img/partner/dark/dark_ak.png');
		partnerAkado.setAttribute('src', 'img/partner/dark/dark_akado.png');
		partnerTelecom.setAttribute('src', 'img/partner/dark/dark_telecom.png');
		partnerVtb.setAttribute('src', 'img/partner/dark/dark_vtb.png');
	}
}

window.addEventListener('scroll', handleScroll);
topBtn.addEventListener('click', scrollToTop);
document.addEventListener('DOMContentLoaded', function () {
	initializeBurgerMenu();
	menu.addEventListener('click', handleMenuClick);
	moveBurgerMenu();
	activeLink();
	const currTheme = defineTheme();
	if (currTheme === 'dark') {
		btnThemeLight.style.display = 'none';
		btnThemeDark.style.display = 'block';
		document.body.classList.remove('light');
		document.body.classList.add('dark');
		partnerLight();
	} else {
		btnThemeDark.style.display = 'none';
		btnThemeLight.style.display = 'block';
		document.body.classList.remove('dark');
		document.body.classList.add('light');
		partnerDark();
	}
	document.documentElement.dataset.theme = currTheme;
});

window.addEventListener('resize', moveBurgerMenu);

function defineTheme() {
	const theme = localStorage.getItem('theme') || '';
	if (Object.values(themes).includes(theme)) return theme;
	const media = window.matchMedia('(prefers-color-scheme: light)');
	return media.matches ? themes.light : themes.dark;
}

btnTheme.forEach(i => {
	i.addEventListener('click', () => {
		const currTheme = defineTheme();
		if (currTheme === 'dark') {
			document.documentElement.dataset.theme = 'light';
			localStorage.setItem('theme', 'light');
			btnThemeDark.style.display = 'none';
			btnThemeLight.style.display = 'block';
			document.body.classList.remove('dark');
			document.body.classList.add('light');
			partnerDark();
		} else {
			document.documentElement.dataset.theme = 'dark';
			localStorage.setItem('theme', 'dark');
			btnThemeLight.style.display = 'none';
			btnThemeDark.style.display = 'block';
			document.body.classList.remove('light');
			document.body.classList.add('dark');
			partnerLight();
		}
	});
});

const accordionItems = document.querySelectorAll('.question__item');
accordionItems.forEach(item => {
	const title = item.querySelector('.question__name');

	title.addEventListener('click', () => {
		if (item.classList.contains('active')) {
			item.classList.remove('active');
			return;
		}

		const openItem = document.querySelectorAll('.question__item.active');

		openItem.forEach(el => {
			el.classList.remove('active');
		});

		item.classList.add('active');
	});
});

const phone = document.getElementById('phone');
const phoneFooter = document.getElementById('phone-footer');

const maskOptions = {
	mask: '+{7}(000)000-00-00',
};
const mask = IMask(phone, maskOptions);
const maskFooter = IMask(phoneFooter, maskOptions);
