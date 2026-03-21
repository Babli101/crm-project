import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  let token = "";

  // ✅ SSR safe check
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token") || "";
  }

  if (token) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }

};