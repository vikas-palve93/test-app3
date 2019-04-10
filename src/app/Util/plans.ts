export const plans = [
    {
        isActive: true,
        title: "Startup",
        monthlyPrice: "$0",
        yearlyPrice: "$0",
        customPrice: false,
        userLimit: "Up to 2 Users",
        access: "Cloud access",
        buttonText: "Get started",
        isTrialAllowed: false,
    },
    {
        isActive: true,
        title: "Business",
        monthlyPrice: "$12",
        yearlyPrice: "$10",
        customPrice: false,
        userLimit: "Up to 100 Users",
        access: "Cloud access",
        buttonText: "Buy Now",
        isTrialAllowed: true,
    },
    {
        isActive: true,
        title: "Enterprise",
        monthlyPrice: "$10",
        yearlyPrice: "$8",
        customPrice: false,
        userLimit: "Up to 1000 Users",
        access: "Cloud access",
        buttonText: "Buy Now",
        isTrialAllowed: true
    },
    {
        isActive: true,
        title: "Custom",
        customPrice: true,
        userLimit: "Unlimited Users",
        access: "Cloud / On Premise access",
        buttonText: "Contact Us",
        isTrialAllowed: false
    }
];

export const features = {
    pmDashboardAllowed: "PM Dashboard",
    cxoDashboardAllowed: "CxO and PM Dashboard",
    sourceControlAllowed: "Source Controls : Git Hub, Bit Bucket, Git Lab, Git URL",
    fixesRecommendationAllowed: "Fixes Recommendations",
    securityAllowed: "Security",
    privateRepoAllowed: "Public and Private Repo",
    unlimitedRepoAllowed: "Unlimited Projects",
    limitedRepoAllowed: "Upto 2 projects",
    codeDuplicationAllowed: "Full Code view to check duplication blocks and coverage",
    codeDuplicationNotAllowed: "File mentions for duplication blocks"
}

export const support = {
    supportTime: "12x5",
    phoneAllowed: "Phone Support",
    emailAllowed: "Email Support",
    chatAllowed: "Chat Support",
    sharedCustomer: "Shared Customer Success",
    sharedAccount: "Shared Account Manager",
    dedicatedCustomer: "Dedicated Customer Success",
    dedicatedAccount: "Dedicated Account Manager"
}