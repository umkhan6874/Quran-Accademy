package com.example.ui.navigation

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.example.data.model.UserRole
import com.example.ui.MainViewModel
import com.example.ui.screens.*
import com.example.ui.theme.EmeraldPrimary

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Home : Screen("home", "Home", Icons.Default.Home)
    object Learn : Screen("learn", "Learn", Icons.Default.MenuBook)
    object Quran : Screen("quran", "Quran", Icons.Default.AutoStories)
    object Classes : Screen("classes", "Classes", Icons.Default.School)
    object Tools : Screen("tools", "Tools", Icons.Default.Widgets)
}

@Composable
fun AppNavigation(viewModel: MainViewModel) {
    var screenStack by remember { mutableStateOf(listOf("landing")) }
    val currentRoute = screenStack.lastOrNull() ?: "landing"
    val profile by viewModel.userProfile.collectAsState()

    fun navigateTo(route: String) {
        if (screenStack.lastOrNull() != route) {
            screenStack = screenStack + route
        }
    }

    fun popBack() {
        if (screenStack.size > 1) {
            screenStack = screenStack.dropLast(1)
        }
    }

    val isBottomBarVisible = currentRoute in listOf("home", "student", "parent", "teacher", "learn", "qaida", "quran", "classes", "tools")

    Scaffold(
        bottomBar = {
            if (isBottomBarVisible) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 6.dp,
                    windowInsets = WindowInsets.navigationBars
                ) {
                    val activeHomeRoute = when (profile.role) {
                        UserRole.STUDENT -> "student"
                        UserRole.PARENT -> "parent"
                        UserRole.TEACHER -> "teacher"
                    }

                    NavigationBarItem(
                        selected = currentRoute in listOf("home", "student", "parent", "teacher"),
                        onClick = {
                            screenStack = listOf(activeHomeRoute)
                        },
                        icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                        label = { Text("Home") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = EmeraldPrimary,
                            indicatorColor = MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_item_home")
                    )

                    NavigationBarItem(
                        selected = currentRoute in listOf("learn", "qaida", "tajweed", "hifz"),
                        onClick = {
                            screenStack = listOf(activeHomeRoute, "qaida")
                        },
                        icon = { Icon(Icons.Default.MenuBook, contentDescription = "Learn") },
                        label = { Text("Learn") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = EmeraldPrimary,
                            indicatorColor = MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_item_learn")
                    )

                    NavigationBarItem(
                        selected = currentRoute == "quran",
                        onClick = {
                            screenStack = listOf(activeHomeRoute, "quran")
                        },
                        icon = { Icon(Icons.Default.AutoStories, contentDescription = "Quran") },
                        label = { Text("Quran") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = EmeraldPrimary,
                            indicatorColor = MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_item_quran")
                    )

                    NavigationBarItem(
                        selected = currentRoute in listOf("classes", "teachers"),
                        onClick = {
                            screenStack = listOf(activeHomeRoute, "classes")
                        },
                        icon = { Icon(Icons.Default.School, contentDescription = "Classes") },
                        label = { Text("Classes") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = EmeraldPrimary,
                            indicatorColor = MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_item_classes")
                    )

                    NavigationBarItem(
                        selected = currentRoute in listOf("tools", "ai_tutor", "settings"),
                        onClick = {
                            screenStack = listOf(activeHomeRoute, "tools")
                        },
                        icon = { Icon(Icons.Default.Widgets, contentDescription = "Tools") },
                        label = { Text("Tools") },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = EmeraldPrimary,
                            indicatorColor = MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("nav_item_tools")
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            BackHandler(enabled = screenStack.size > 1) {
                popBack()
            }

            when (currentRoute) {
                "landing" -> LandingScreen(
                    viewModel = viewModel,
                    onGetStarted = { navigateTo("onboarding") },
                    onFindTeacher = { navigateTo("teachers") },
                    onGuestLogin = {
                        val target = when (profile.role) {
                            UserRole.STUDENT -> "student"
                            UserRole.PARENT -> "parent"
                            UserRole.TEACHER -> "teacher"
                        }
                        screenStack = listOf(target)
                    }
                )

                "onboarding" -> OnboardingScreen(
                    viewModel = viewModel,
                    onFinish = {
                        val target = when (profile.role) {
                            UserRole.STUDENT -> "student"
                            UserRole.PARENT -> "parent"
                            UserRole.TEACHER -> "teacher"
                        }
                        screenStack = listOf(target)
                    },
                    onSkip = {
                        screenStack = listOf("student")
                    }
                )

                "student", "home" -> StudentDashboardScreen(
                    viewModel = viewModel,
                    onNavigate = { route -> navigateTo(route) }
                )

                "parent" -> ParentDashboardScreen(
                    viewModel = viewModel,
                    onBack = { popBack() },
                    onBookClass = { navigateTo("teachers") }
                )

                "teacher" -> TeacherDashboardScreen(
                    viewModel = viewModel,
                    onBack = { popBack() },
                    onEnterClassroom = { navigateTo("classroom") }
                )

                "qaida", "learn" -> NooraniQaidaScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "quran" -> QuranReaderScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "tajweed" -> TajweedScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "hifz" -> HifzScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "teachers" -> TeachersScreen(
                    viewModel = viewModel,
                    onBack = { popBack() },
                    onBookingSuccess = {
                        screenStack = screenStack.dropLast(1) + "classes"
                    }
                )

                "classes" -> MyClassesScreen(
                    viewModel = viewModel,
                    onBack = { popBack() },
                    onJoinClass = { navigateTo("classroom") },
                    onBookNewClass = { navigateTo("teachers") }
                )

                "classroom" -> LiveClassroomScreen(
                    viewModel = viewModel,
                    onLeaveClass = { popBack() }
                )

                "ai_tutor" -> AiTutorScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "tools" -> IslamicToolsScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                "settings" -> SettingsScreen(
                    viewModel = viewModel,
                    onBack = { popBack() }
                )

                else -> StudentDashboardScreen(
                    viewModel = viewModel,
                    onNavigate = { route -> navigateTo(route) }
                )
            }
        }
    }
}
