document.addEventListener("DOMContentLoaded", function () {
    const bmiForm = document.getElementById("bmiform");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const ageInput = document.getElementById("age");
    const resultDiv = document.getElementById("result");
    const explanationDiv = document.getElementById("explanation");

    bmiForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah form refresh halaman
        
        // Ambil nilai input dan simpan di localStorage
        const weight = parseFloat(weightInput.value);
        const heightCm = parseFloat(heightInput.value);
        const age = parseInt(ageInput.value);

        localStorage.setItem("weight", weight);
        localStorage.setItem("height", heightCm);
        localStorage.setItem("age", age);
        
        // Konversi tinggi ke meter
        const heightM = heightCm / 100;
        
        // Hitung BMI
        const bmi = (weight / (heightM * heightM)).toFixed(2);
        
        // Tentukan kategori BMI
        let category = "";
        let advice = "";

        if (bmi < 18.5) {
            category = "Underweight";
            advice = "gain weight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal weight";
            advice = "maintain your weight";
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
            advice = "lose weight";
        } else {
            category = "Obese";
            advice = "lose weight";
        }

        // Tentukan rentang BMI ideal
        const minIdealWeight = (18.5 * heightM * heightM).toFixed(2);
        const maxIdealWeight = (24.9 * heightM * heightM).toFixed(2);

        // Tampilkan hasil
        resultDiv.innerHTML = `<h3>Your BMI: ${bmi}</h3><br><p>You are classified as: <strong>${category}</strong></p>`;


        // tampilkan penjelasan hasil
        explanationDiv.innerHTML = `<br><p>Your ideal weight range is between ${minIdealWeight} kg and ${maxIdealWeight} kg.<br><br>
                                    You are classified as <strong>${category}</strong>.
                                    The best way to ${advice} is by managing your calorie intake and engaging in regular physical activity.
                                    If your weight is in the normal range, maintain a healthy lifestyle.</p><br>`;
    });

    // Cek apakah ada data yang tersimpan di localStorage
    if (localStorage.getItem("weight")) {
        weightInput.value = localStorage.getItem("weight");
    }
    if (localStorage.getItem("height")) {
        heightInput.value = localStorage.getItem("height");
    }
    if (localStorage.getItem("age")) {
        ageInput.value = localStorage.getItem("age");
    }
});
