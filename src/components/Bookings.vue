<template>
    <div class="container mx-auto">
        <h3 class="text-xl font-bold text-gray-700 px-6 py-4">{{ title }}</h3> 
        <table class="table-auto w-full px-6 py-4 rounded shadow-lg bg-white">
            <thead>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Id</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Gast</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Email</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Telefoon</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Waar</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Uitrusting</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Aantal nachten</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Type reservering</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Bevestigd</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Kosten</th>
                <th class="bg-blue-500 font-light text-left text-white px-4 py-3">Betaald</th>
            </thead>
            <tbody>
                <tr v-for="booking in bookings" v-bind:key="booking.id">
                    <td class="border text-right px-4 py-2">{{ booking.id }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.guest.guestName }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.guest.guestEmail }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.guest.guestPhone }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.prop == 'Camping' ? booking.prop + ' (veld ' + booking.placeNumber + ')' : booking.prop }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.equipment.equipmentName }}</td>
                    <td class="border text-right px-4 py-2">{{ calculateNumberOfNights(booking.durationOfStay.startDate, booking.durationOfStay.endDate) }}</td>
                    <td class="border text-left px-4 py-2">{{ booking.type.typeName }}</td>
                    <td class="border text-left px-4 py-2"><span class="rounded-full py-2 px-4 bg-red-400 text-white" :class="{ 'bg-green-400' : booking.confirmed}">{{ (booking.confirmed ? 'Ja' : 'Nee') }}</span></td>
                    <td class="border text-justify px-4 py-2">&euro; {{ calculateNumberOfNights(booking.durationOfStay.startDate, booking.durationOfStay.endDate) * booking.type.typeCosts }}
                    <td class="border text-left px-4 py-2"><span class="rounded-full py-2 px-4 bg-red-400 text-white" :class="{ 'bg-green-400' : booking.paid}">{{ (booking.paid ? 'Ja' : 'Nee') }}</span></td>
                </tr>
            </tbody>
        </table>
        <div class="py-6 float-right">
            <button class="bg-green-500 hover:bg-green-700 text-white font-light py-2 px-4 rounded">
                Nieuwe reservering toevoegen
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bookings',
    data () {
        return {
            title: 'Bookings',
            bookings: [{
                id: 'ae76y8',
                guest: {
                    guestName: 'Allard Gunnink',
                    guestEmail: 'a.gunnink@example.org',
                    guestPhone: '0612345678'
                },
                prop: 'Camping',
                placeNumber: 5,
                equipment: {
                    equipmentId: 1,
                    equipmentName: 'Caravan',
                    equipmentExtra: false
                },
                durationOfStay: {
                    startDate: '07/15/2020',
                    endDate: '07/23/2020'
                },
                confirmed: true,
                type: {
                    typeId: 1,
                    typeName: 'Kampeerplek € 15 voor maximaal twee personen',
                    typeCosts: 15
                },
                paid: true
            },
            {
                id: 'jk97r4',
                guest: {
                    guestName: 'Aldert Bos',
                    guestEmail: 'a.bos@example.org',
                    guestPhone: '0612345678'
                },
                prop: 'Camping',
                placeNumber: 1,
                equipment: {
                    equipmentId: 3,
                    equipmentName: 'Tent',
                    equipmentExtra: false
                },
                durationOfStay: {
                    startDate: '08/12/2020',
                    endDate: '08/23/2020'
                },
                confirmed: true,
                type: {
                    typeId: 1,
                    typeName: 'Kampeerplek € 15 voor maximaal twee personen',
                    typeCosts: 15
                },
                paid: false
            }, 
            {
                id: 'ty25p8',
                guest: {
                    guestName: 'Bernard Bos',
                    guestEmail: 'b.bos@example.org',
                    guestPhone: '0612345678'
                },
                prop: 'Boshut',
                placeNumber: 0,
                equipment: {
                    equipmentId: 99,
                    equipmentName: 'nvt',
                    equipmentExtra: false
                },
                durationOfStay: {
                    startDate: '08/12/2020',
                    endDate: '08/23/2020'
                },
                confirmed: false,
                type: {
                    typeId: 0,
                    typeName: 'De Boshut € 40,00 (twee personen)',
                    typeCosts: 40
                },
                paid: false
            }]
        }
    },
    methods: {
        calculateNumberOfNights: function(startdate, enddate) {
            let date1 = new Date(startdate);
            let date2 = new Date(enddate)

            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }
}
</script>