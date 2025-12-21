"use client";

import React, { useState } from 'react';

import _button from '@/components/ui/_button';

export default function Home() {
  return (
    <div>
      <_button text="log in" onClick={() => alert("Hello World")} />
      <_button text="sign up" onClick={() => alert("Hello World")} />
      <_button text="log out" onClick={() => alert("Hello World")} />
    </div>
  );
}
